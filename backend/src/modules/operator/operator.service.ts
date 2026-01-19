import { OperatorModel } from "./operator.model";
import { OperatorConfig } from "./operator.types";

export const OperatorService = {
  async getOperatorById(operatorId: string) {
    const op = await OperatorModel.findById(operatorId);
    if (!op || !op.isActive) throw new Error("Operator not found or inactive");
    return op;
  },

  async createOperator(name: string, config: OperatorConfig) {
    return OperatorModel.create({ name, config });
  },

  async updateOperatorConfig(operatorId: string, config: OperatorConfig) {
    return OperatorModel.findByIdAndUpdate(operatorId, { config }, { new: true });
  }
};
