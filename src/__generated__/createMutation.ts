/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createMutation
// ====================================================

export interface createMutation_createComment {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface createMutation {
  createComment: createMutation_createComment;
}

export interface createMutationVariables {
  photoId: number;
  payload: string;
}
