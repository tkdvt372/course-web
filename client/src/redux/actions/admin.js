import { server } from '../store.js';
import axios from 'axios';

export const getAllUsers = formData => async dispatch => {
  try {
    dispatch({ type: 'getAllUsersRequest' });
    const { data } = await axios.get(`${server}/admin/users`, {
      withCredentials: true,
    });

    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFail',
      payload: error.response.data.message,
    });
  }
};

export const createCourse = formData => async dispatch => {
  try {
    dispatch({ type: 'createCourseRequest' });
    const { data } = await axios.post(`${server}/create-course`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteCourse = id => async dispatch => {
  try {
    dispatch({ type: 'deleteCourseRequest' });
    const { data } = await axios.delete(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const addLecture = (id, formData) => async dispatch => {
  try {
    dispatch({ type: 'addLectureCourseRequest' });
    const { data } = await axios.post(`${server}/course/${id}`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'addLectureCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addLectureCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    dispatch({ type: 'deleteLectureCourseRequest' });
    const { data } = await axios.delete(
      `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'deleteLectureCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteLectureCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const updateUserRole = id => async dispatch => {
  try {
    dispatch({ type: 'updateUserRoleRequest' });
    const { data } = await axios.put(
      `${server}/admin/user/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    dispatch({ type: 'deleteUserRequest' });
    const { data } = await axios.delete(`${server}/admin/user/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  }
};


export const getAdminStats = () => async dispatch => {
  try {
    dispatch({ type: 'getAdminStatsRequest' });
    const { data } = await axios.get(`${server}/admin/stats`, {
      withCredentials: true,
    });

    dispatch({ type: 'getAdminStatsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getAdminStatsFail',
      payload: error.response.data.message,
    });
  }
};

