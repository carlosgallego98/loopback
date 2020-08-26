import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Post, PostRelations, Comment} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CommentRepository} from './comment.repository';

export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype.id,
  PostRelations
> {

  public readonly comments: HasManyRepositoryFactory<Comment, typeof Post.prototype.id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('CommentRepository') protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(Post, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', commentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
  }
}
