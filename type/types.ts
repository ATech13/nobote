import { Event as EventType, User as UserType, AuthUser as AuthUserType, Comment } from "@prisma/client"

export interface EventPropsInterface {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    status: string;
    endDate: Date;
    coverImage?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface EventGalleryInterface {
    events: EventPropsInterface[]
}

export interface FormPropsInterface {
    initialValues: {
        title: string;
        description: string;
        startDate: Date;
        endDate: Date;
        coverImage?: string;
    };
    onSubmit: (formData: FormData) => Promise<void>
    submitButtonLabel: string;
    coverImagePreview?: string
}

export interface EventFormDataInterface {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    coverImage?: string;
}

export interface UserPropsInterface {
    id: string;
    fullName: string;
    username: string;
    email: string;
    bio?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type EventDetail = {
    id: string
    title: string
    description: string
    coverImage?: string | null
    startDate: string
    endDate: string
    status: string
    createdAt: string
    updatedAt: string
    users: User[]
}

export interface User {
    id: string
    fullName: string
    username: string
    email: string
    avatar?: string
    bio?: string
    eventId: string
    password: string
}

export interface Result {
  id: string
  fullName: string
  username: string
  avatar?: string | null
  votesCount: number
}

export const userSelect = {
    id: true,
    fullName: true,
    username: true,
    email: true,
    bio: true,
    avatar: true,
    createdAt: true,
}

export type StatusType = "DISABLED" | "ACTIVE" | "UPCOMING" | "FINISHED"

export interface UploadedFile {
    filePath: string
    url: string
    name: string
    fileId: string
}

export interface EventUser extends EventType {
    users: UserType[],
    comments: Comment[]
}

export interface AuthUser extends AuthUserType {
    events: EventType[]
}