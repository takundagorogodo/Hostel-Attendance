import Student from '../models/Student.js';
import Room from '../models/Room.js';
import User from '../models/User.js';
import { AppError } from '../utils/appError.js';
import logger from '../utils/logger.js';

const detachFromRoom = async (student) => {
  if (!student.room) return;
  const room = await Room.findById(student.room);
  if (room) {
    room.students.pull(student._id);
    await room.save();
  }
};

export const addStudentService = async ({ name, studentId, roomId }) => {
  if (!name || !studentId || !roomId) throw new AppError('name, studentId, and roomId are required', 400);

  const existingStudent = await Student.findOne({ studentId });
  if (existingStudent) throw new AppError('A student with that ID already exists', 409);

  const room = await Room.findById(roomId);
  if (!room) throw new AppError('Room not found', 404);
  if (room.students.length >= room.capacity) throw new AppError('Room is at full capacity', 409);

  const student = await Student.create({ name, studentId, room: roomId });
  room.students.push(student._id);
  await room.save();
  return student;
};

export const deleteStudentService = async (id) => {
  const student = await Student.findById(id);
  if (!student) throw new AppError('Student not found', 404);
  await detachFromRoom(student);
  await Student.findByIdAndDelete(id);
  if (student.user) {
    await User.findByIdAndUpdate(student.user, { profile: null, profileModel: null });
  }
  return { message: 'Student removed successfully' };
};

export const changeRoomService = async (id, newRoomId) => {
  if (!newRoomId) throw new AppError('newRoomId is required', 400);
  const student = await Student.findById(id);
  if (!student) throw new AppError('Student not found', 404);
  if (student.room?.toString() === newRoomId) throw new AppError('Student is already assigned to that room', 409);

  const newRoom = await Room.findById(newRoomId);
  if (!newRoom) throw new AppError('New room not found', 404);
  if (newRoom.students.length >= newRoom.capacity) throw new AppError('New room is at full capacity', 409);

  await detachFromRoom(student);
  newRoom.students.push(student._id);
  await newRoom.save();
  student.room = newRoomId;
  await student.save();
  return student;
};

export const transferStudentService = async (id, newHostelId) => {
  if (!newHostelId) throw new AppError('newHostelId is required', 400);
  const student = await Student.findById(id);
  if (!student) throw new AppError('Student not found', 404);

  const availableRoom = await Room.findOne({
    hostel: newHostelId,
    $expr: { $lt: [{ $size: '$students' }, '$capacity'] },
  });
  if (!availableRoom) throw new AppError('No available rooms in the destination hostel', 409);

  await detachFromRoom(student);
  availableRoom.students.push(student._id);
  await availableRoom.save();
  student.room = availableRoom._id;
  await student.save();
  return { message: 'Student transferred successfully', room: availableRoom._id };
};