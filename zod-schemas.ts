import { z } from "zod";

export const eventGallerySchema = z.object({
  id: z.number().int(),
  imageId: z.number().int(),
  eventId: z.number().int(),
});

export const eventTagsSchema = z.object({
  id: z.number().int(),
  tagId: z.number().int(),
  eventId: z.number().int(),
});

export const eventsSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
  title: z.string(),
  organizer: z.string(),
  location: z.string(),
  locationType: z.string(),
  province: z.string(),
  format: z.string(),
  type: z.string(),
  description: z.string(),
  bannerImage: z.string(),
  startDate: z.date(),
  registrationDeadline: z.date(),
  registrationLink: z.string(),
  contactEmail: z.string(),
  website: z.string(),
  status: z.string(),
  cost: z.string(),
  socials: z.number().int(),
  slug: z.string(),
  contributedBy: z.number().int(),
});

export const gallerySchema = z.object({
  id: z.number().int(),
  publicImageSourceId: z.string(),
  publicImage: z.string(),
});

export const organizationGallerySchema = z.object({
  id: z.number().int(),
  imageId: z.number().int(),
  organizationId: z.number().int(),
});

export const organizationTagsSchema = z.object({
  id: z.number().int(),
  tagId: z.number().int(),
  organizationId: z.number().int(),
});

export const organizationsSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  province: z.string(),
  city: z.string(),
  country: z.string(),
  publicImageSourceId: z.string(),
  publicImage: z.string(),
  slug: z.string(),
});

export const resourceSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  decription: z.string(),
  publicImageSourceId: z.string(),
  publicImage: z.string(),
  sourceUrl: z.string(),
  linkText: z.string(),
  type: z.string(),
});

export const socialsSchema = z.object({
  id: z.number().int(),
  data: z.unknown(),
  userId: z.number().int(),
  eventId: z.number().int(),
  organizationId: z.number().int(),
});

export const tagsSchema = z.object({
  id: z.number().int(),
  tag: z.string(),
  isUserTag: z.unknown(),
  isOrganizationTag: z.unknown(),
  isEventTag: z.unknown(),
  isNewsTag: z.unknown(),
  isOpportunityTag: z.unknown(),
});

export const userGallerySchema = z.object({
  id: z.number().int(),
  imageId: z.number().int(),
  userId: z.number().int(),
});

export const userTagsSchema = z.object({
  id: z.number().int(),
  tagId: z.number().int(),
  userId: z.number().int(),
});

export const usersSchema = z.object({
  id: z.number().int(),
  bio: z.string(),
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  gender: z.string(),
  province: z.string(),
  city: z.string(),
  country: z.string(),
  profession: z.string(),
  expertise: z.string(),
  affiliatedOrganization: z.string(),
  publicImageSourceId: z.string(),
  publicImage: z.string(),
  slug: z.string(),
  scope: z.unknown(),
  isEmailVerified: z.unknown(),
  isActive: z.unknown(),
  password: z.string(),
  requiresPasswordChange: z.unknown(),
  resetPasswordToken: z.string(),
  resetPasswordExpiryTime: z.date(),
  emailVerificationToken: z.string(),
  emailVerificationExpiryTime: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

