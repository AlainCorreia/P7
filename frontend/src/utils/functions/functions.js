export const formatDate = (value) => {
  const parsedDate = Date.parse(value);

  const formattedDate = new Date(parsedDate).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return formattedDate;
};
