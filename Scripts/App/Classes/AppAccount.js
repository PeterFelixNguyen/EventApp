/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file
/// <reference path="IAccount.ts" />
/// <reference path="FormFieldValidator.ts" />
/// <reference path="DbContext.ts" />
var AppAccount = (function () {
    function AppAccount($scope, $http) {
        this.$scope = $scope;
        this.$http = $http;
    }
    // parameterized $scope to use its AngularJS directive
    AppAccount.prototype.SignUp = function (userName, email, password, confirmPassword) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.$scope.IsUserNameFailure = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").isTheFieldFailure;
        this.$scope.userNameFailureMessage = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").formFieldFailureMessage;
        this.$scope.IsEmailFailure = FormFieldValidator.ValidateIsEmailForm(this.email, "Email").isTheFieldFailure;
        this.$scope.emailFailureMessage = FormFieldValidator.ValidateIsEmailForm(this.email, "Email").formFieldFailureMessage;
        this.$scope.IsPasswordFailure = FormFieldValidator.ValidateIsPassword(this.password, "Password").isTheFieldFailure;
        this.$scope.passwordFailureMessage = FormFieldValidator.ValidateIsPassword(this.password, "Password").formFieldFailureMessage;
        this.$scope.IsConfirmPasswordFailure = FormFieldValidator.ValidateIsSameValue(this.confirmPassword, this.password, "Confirm Password").isTheFieldFailure;
        this.$scope.confirmPasswordFailureMessage = FormFieldValidator.ValidateIsSameValue(this.confirmPassword, this.password, "Confirm Password").formFieldFailureMessage;
        if (this.$scope.IsUserNameFailure === false &&
            this.$scope.IsEmailFailure === false &&
            this.$scope.IsPasswordFailure === false &&
            this.$scope.IsConfirmPasswordFailure === false) {
            var db = new DbContext(this.$http);
            db.CreateNewAccount(this.userName, this.email, this.password);
        }
    };
    AppAccount.prototype.SignIn = function (userName, password) {
        this.userName = userName;
        this.password = password;
        this.$scope.IsUserNameFailure = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").isTheFieldFailure;
        this.$scope.userNameFailureMessage = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").formFieldFailureMessage;
        this.$scope.IsPasswordFailure = FormFieldValidator.ValidateIsEmpty(this.password, "Password").isTheFieldFailure;
        this.$scope.passwordFailureMessage = FormFieldValidator.ValidateIsEmpty(this.password, "Password").formFieldFailureMessage;
        if (this.$scope.IsUserNameFailure === false && this.$scope.IsPasswordFailure === false) {
            var db = new DbContext(this.$http);
            db.GetUser(this.userName, this.password);
        }
    };
    AppAccount.prototype.ResetPassword = function (userName, email) {
        this.userName = userName;
        this.email = email;
        this.$scope.IsUserNameFailure = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").isTheFieldFailure;
        this.$scope.userNameFailureMessage = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").formFieldFailureMessage;
        this.$scope.IsEmailFailure = FormFieldValidator.ValidateIsEmailForm(this.email, "Email").isTheFieldFailure;
        this.$scope.emailFailureMessage = FormFieldValidator.ValidateIsEmailForm(this.email, "Email").formFieldFailureMessage;
        if (this.$scope.IsUserNameFailure === false && this.$scope.IsEmailFailure === false) {
            var db = new DbContext(this.$http);
            db.ResetPassword(this.userName, this.email);
        }
    };
    AppAccount.prototype.ChangePassword = function (password, newPassword, newConfirmPassword) {
        this.password = password;
        this.newPassword = newPassword;
        this.confirmPassword = newConfirmPassword;
        this.$scope.IsCurrentPasswordFailure = FormFieldValidator.ValidateIsEmpty(this.password, "Current Password").isTheFieldFailure;
        this.$scope.currentPasswordFailureMessage = FormFieldValidator.ValidateIsEmpty(this.password, "Current Password").formFieldFailureMessage;
        this.$scope.IsPasswordFailure = FormFieldValidator.ValidateIsPassword(this.newPassword, "New Password").isTheFieldFailure;
        this.$scope.passwordFailureMessage = FormFieldValidator.ValidateIsPassword(this.newPassword, "New Password").formFieldFailureMessage;
        this.$scope.IsConfirmPasswordFailure = FormFieldValidator.ValidateIsSameValue(this.confirmPassword, this.newPassword, "Confirm New Password").isTheFieldFailure;
        this.$scope.confirmPasswordFailureMessage = FormFieldValidator.ValidateIsSameValue(this.confirmPassword, this.newPassword, "Confirm New Password").formFieldFailureMessage;
        if (this.$scope.IsCurrentPasswordFailure === false && this.$scope.IsPasswordFailure === false && this.$scope.IsConfirmPasswordFailure === false) {
            var username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var db = new DbContext(this.$http);
            db.ChangePassword(username, this.password, this.newPassword);
        }
    };
    return AppAccount;
}());
//import angular module to use AngularJS in TypeScript file
angular.module("EventApp").controller("SignUpController", AppAccount);
angular.module("EventApp").controller("SignInController", AppAccount);
angular.module("EventApp").controller("ForgotPasswordController", AppAccount);
angular.module("EventApp").controller("MyAccountController", AppAccount);
