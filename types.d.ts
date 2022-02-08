export declare global {
  interface FetchedUserType {
    _id: string;
    fName: string;
    lName: string;
    imageURL: string;
  }

  interface UserType extends FetchedUserType {
    email: string;
  }

  interface UserInvited extends UserType {
    inviteDate: Date;
    inviteId: string;
  }

  interface FriendType extends UserType {
    connectionId: string;
  }

  interface InviteType {
    _id: string;
    from: string;
    to: string;
    date: Date;
  }

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
}
