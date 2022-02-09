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
  }

  interface PostType {
    _id: string;
    author: UserType;
    isPublic: boolean;
    content: string;
    imageURLs: string[];
    likes: number;
    commentsCount: number;
    comments: PostType[];
  }

  interface NotificationType {
    _id: string;
    date: Date;
    type: 'like' | 'mention' | 'reply' | 'comment';
    who: UserType;
    to: UserType;
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
