import { Event } from "@/type/event";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw Error("API_URL is not defined in the environment variables.");
}

export const fetchAllEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  }
  catch(error) {
    console.error(error);
    throw error;
  }
}

export const fetchOneEvent = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
  catch(error) {
    console.error(error);
    throw error;
  }
}

export const updateEvent = async (id: number, updatedEvent: Event) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updatedEvent)
    return response.data;
  }
  catch(error) {
    console.error(error);
    throw error;
  }
}

export const deleteEvent = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data
  }
  catch(error) {
    console.error(error);
    throw error;
  }
}

export const createEvent = async (newEvent: Omit<Event, 'id'>) => {
  try {
    const response = await axios.post(API_URL, newEvent);
    return response.data;
  } catch(error) {
    console.error(error);
    throw error;
  }
}


