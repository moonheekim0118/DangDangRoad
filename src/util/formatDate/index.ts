const formatDate = (createdAt?: number): string => {
  if (!createdAt) return '';
  const parsedDate = new Date(createdAt);
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

export default formatDate;
