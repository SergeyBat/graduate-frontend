import axios from 'axios';
import URL from '@redux/urls';

const getImageUrl = async (imageKey: string, callback: any = () => {}) => {
  try {
    const { data: imageUrl } = await axios.get(`${URL.MINIO}/${imageKey}`);
    await callback(imageUrl);
    return imageUrl;
  } catch (error) {
    return '';
  }
};

export default getImageUrl;
