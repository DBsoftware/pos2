export class OperationResult {

  result: any[]
  errors: string[]
  redirect: string
  success: boolean;

  getErrors() {
    return this.errors
  }

  getRedirect() {
    return this.redirect
  }

  isSuccess() {
    return this.success
  }
}
