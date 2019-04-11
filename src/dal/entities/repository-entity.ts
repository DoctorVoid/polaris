import * as joi from 'joi';
export interface RepositoryEntity {
    _id: object;
    deleted: boolean;
    createdBy?: string;
    lastUpdatedBy?: string;
    creationDate: Date;
    lastUpdateDate: Date;
    dataVersion: number;
    realityId: number;
    classification?: string;
    secretGroups?: string[];
}

const schema = joi.object().keys({
    _id: joi.object().required(),
    deleted: joi.boolean().required(),
    createdBy: joi.string(),
    lastUpdatedBy: joi.string(),
    creationDate: joi.date().required(),
    lastUpdateDate: joi.date().required(),
    dataVersion: joi.number().required(),
    realityId: joi.number().required(),
    classification: joi.string(),
    secretGroups: joi.array().items(joi.string()),
});

export function isRepositoryEntity(candidate: object): boolean {
    return !joi.validate(candidate, schema, { stripUnknown: true }).error;
}
