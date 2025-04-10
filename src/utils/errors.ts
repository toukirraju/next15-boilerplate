
export type ErrorDetails = {
    redirectTo?: string | null;
    [key: string]: any;
} | null;

export class ApiError extends Error {
    status: number;
    details: ErrorDetails


    constructor(message: string, status: number, details?: ErrorDetails) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.details = details as ErrorDetails;
    }
}


