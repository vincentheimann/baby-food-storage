// src/services/notificationService.js
export const getNotifications = (aliments) => {
  const today = new Date();
  const notifications = aliments.filter((aliment) => {
    const peremptionDate = new Date(aliment.expirationDate);
    const diffDays = (peremptionDate - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  });

  return notifications;
};
