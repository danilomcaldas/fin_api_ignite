import { injectable, inject } from "tsyringe";

import { IMakeTransferDTO } from "./IMakeTransferDTO";

import { Statement } from "../../entities/Statement";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { MakeTransferError } from "./MakeTransferError";
import { IStatementsRepository } from "../../../statements/repositories/IStatementsRepository";

@injectable()
class MakeTransferUseCase {
  constructor(
    @inject("StatementsRepository")
    private statementsRepository: IStatementsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    amount,
    description,
    sender_id,
    recipient_id,
  }: IMakeTransferDTO): Promise<Statement[]> {

    const senderUser = await this.usersRepository.findById(sender_id);

    if(!senderUser){
        throw new MakeTransferError.SendUserNotFound()
    }
    const recipientUser = await this.usersRepository.findById(recipient_id);

    if(!recipientUser){
        throw new MakeTransferError.ReceiveUserNotFound()
    }


    const {balance : sendBalance} = await this.statementsRepository.getUserBalance({ user_id : sender_id})

    if(amount > sendBalance){
        throw new MakeTransferError.InsufficientFunds()
    }
    
    const transfer = await this.statementsRepository.transferOperation({
      amount,
      description,
      sender_id,
      recipient_id,
    });
    
    return transfer
  }
}

export { MakeTransferUseCase };
