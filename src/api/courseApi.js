import { API_URL } from '../utils/constant.js';

export const getCourses = async () => {
  try {
    const courseRes = await fetch(`${API_URL}/courses`);

    if (!courseRes.ok)
      throw new Error('Failed to fetch courses data. Please try again later.');

    const coursesData = await courseRes.json();

    return coursesData;

    //
  } catch (err) {
    console.log(err.message);
  }
};
