import { readDbFile, writeDbFile } from "./dbUtils";

export const saveOrder = (orderData: any): void => {
  const db = readDbFile();
  const orderExists = db.some((item) => item.id === orderData.id);

  if (!orderExists) {
    db.push(orderData);
    writeDbFile(db);
  }
};
