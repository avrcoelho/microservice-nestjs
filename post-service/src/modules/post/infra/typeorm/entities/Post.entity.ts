import {
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
class PostEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column()
  image: string | null;

  @CreateDateColumn({ update: false })
  created_at: Date;

  @UpdateDateColumn({ insert: false })
  updated_at: Date;
}

export default PostEntity;
