import {DefaultCrudRepository} from '@loopback/repository';
import {Comment, CommentRelations} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CommentRepository extends DefaultCrudRepository<
  Comment,
  typeof Comment.prototype.id,
  CommentRelations
> {
  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource,
  ) {
    super(Comment, dataSource);
  }
}
