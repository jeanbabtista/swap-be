export const enum PgConstraintEnum {
  USER_FIREBASE_UID_UNIQUE = 'user_firebase_uid_unique',
  USER_USERNAME_NOT_EMPTY_CHECK = 'username_not_empty',
  USER_EMAIL_NOT_EMPTY_CHECK = 'email_not_empty',
  USER_EMAIL_CHECK = 'email_valid',
  USER_EMAIL_UNIQUE = 'email_unique',
  PRODUCT_NAME_NOT_EMPTY_CHECK = 'product_name_not_empty',
  PRODUCT_SHORT_DESCRIPTION_NOT_EMPTY_CHECK = 'product_short_description_not_empty',
  PRODUCT_CONDITION_CHECK = 'product_condition',
}
