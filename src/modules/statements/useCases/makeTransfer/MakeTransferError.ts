import {AppError} from '../../../../shared/errors/AppError'


namespace MakeTransferError{

    export class SendUserNotFound extends AppError{
        constructor() {
            super('User sender not found!', 404)
        }
    }

    export class ReceiveUserNotFound extends AppError{
        constructor() {
            super('User receive not found!', 404)
        }
    }

    export class InsufficientFunds extends AppError{
        constructor() {
            super('User your balance is insufficient!', 404)
        }
    }
}

export {MakeTransferError}