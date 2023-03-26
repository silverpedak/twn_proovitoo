import { MigrationInterface } from "mongo-migrate-ts";
import { Db } from "mongodb";
import { residentData, RESIDENTS_COLLECTION } from "../common";

export class CreateOneResidentMigration implements MigrationInterface {
  async up(db: Db): Promise<any> {
    const resident = residentData();
    const residents = await db
      .collection(RESIDENTS_COLLECTION)
      .find()
      .toArray();
    if (residents.length === 0) {
      await db.collection(RESIDENTS_COLLECTION).insertOne(resident);
    }
  }

  async down(db: Db): Promise<any> {
    const resident = residentData();
    await db.collection(RESIDENTS_COLLECTION).deleteOne(resident);
  }
}
