 class ValidationLogicConflictError  extends Error {
    constructor(message) {
      super(message);
      this.name = "validationLogicConflictError";
    }
  }
  
 class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "validationError";
    }
  }

module.exports={
    ValidationError,ValidationLogicConflictError
}