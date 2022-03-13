export declare global {
  interface FetchedUserType {
    _id: string;
    fName: string;
    lName: string;
    imageURL: string;
    followed: number;
  }

  interface UserType extends FetchedUserType {
    email: string;
  }

  interface FriendType extends UserType {
    connectionId: string;
  }

  interface InviteType {
    _id: string;
    from: UserType;
    to: UserType;
    date: Date;
    read: boolean;
  }

  interface PostType {
    _id: string;
    author: UserType;
    isPublic: boolean;
    content: string;
    imageURLs: string[];
    likes: number;
    comments: PostType[];
    parentPost: string | null;
  }

  interface NotificationType {
    _id: string;
    date: Date;
    type: 'like' | 'mention' | 'reply' | 'comment';
    who: UserType;
    to: UserType;
    read: boolean;
    postId: string;
  }

  // BACKEND
  interface CConnectionType {
    _id: string;
    imageURL?: string;
    name?: string;
    admins?: UserType[];
    users: UserType[];
    group: boolean;
    blocked: {
      by: string | null;
      yes: boolean;
    };
  }
}
