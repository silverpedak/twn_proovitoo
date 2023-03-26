const oneResident = require("../constants/resident");

const RESIDENTS_COLLECTION = "residents";

module.exports = {
  async up(db) {
    const residents = await db
      .collection(RESIDENTS_COLLECTION)
      .find()
      .toArray();
    if (residents.length === 0) {
      await db.collection(RESIDENTS_COLLECTION).insertOne(oneResident);
    }
  },

  async down(db) {
    await db.collection(RESIDENTS_COLLECTION).deleteOne(oneResident);
  },
};
