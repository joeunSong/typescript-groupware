import USER_API from '../services/user';

const getEditable = async (workId: number) => {
  try {
    const response = await USER_API.is_editable(workId);
    const editArray = response.data;
    if (editArray.length && editArray[editArray.length - 1].status === 'PENDING') return false;
    else return true;
  } catch (error) {
    return false;
  }
};

export default getEditable;
