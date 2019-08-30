import * as mongoose from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ItemDocument } from 'src/documents/db.data';
import { Item } from 'src/models/item.model';
import { CreateItem } from 'src/models/create-item.model';

/* {authors: {$in: [{firstName: "Hilover", lastName: "Korolenko"}]}}
*/

@Injectable()
export class ItemRepository {
  constructor(
    @Inject('ITEM_MODEL')
    private readonly itemModel: mongoose.model<ItemDocument>,
  ) {}

  async findAll(quary: object = {}): Promise<ItemDocument[]> {
    const items =  await this.itemModel.find(quary);

    return items;
  }
  async findOne(id: string): Promise<ItemDocument> {
    const item = await this.itemModel.findById(id).populate('authors').exec();
    return item;
  }

  async create(item: CreateItem): Promise<ItemDocument> {
    const createdItem = new this.itemModel(item);
    const newItem = await createdItem.save();

    return newItem;
  }

  async update(id: string, item: CreateItem): Promise<ItemDocument> {
    const updItem = await this.itemModel.findByIdAndUpdate(id, item, { new: true });

    return updItem;
  }

  async delete(id: string): Promise<ItemDocument> {
    const deletedItem = await this.itemModel.findByIdAndRemove(id);

    return deletedItem;
  }
}