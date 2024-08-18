import axios from 'axios';
import URL from 'src/redux/urls';

import { message } from 'antd';
import {
  UPLOAD_IMAGE_START,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_FAILURE,
} from '../types';

const uploadImage = (
  uploadData: {file: any},
  setImg: any,
  setLoading: any,
): any => async (dispatch: any, getState: any) => {
  const { file } = uploadData;
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
    return;
  }
  setLoading(true);

  const formData = new FormData();
  formData.append('image', file, file.name);

  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: UPLOAD_IMAGE_START });
    const { data } = await axios.post(
      `${URL.MINIO}/upload`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    setImg(data);
    setLoading(false);
    dispatch({ type: UPLOAD_IMAGE_SUCCESS });
  } catch (err: any) {
    const { response: { data = {} } = {} } = err || {};
    dispatch({ type: UPLOAD_FAILURE, payload: data.message || '' });
  }
};

export default {
  uploadImage,
};
