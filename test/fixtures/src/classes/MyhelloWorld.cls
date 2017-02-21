public class MyHelloWorld {
// This method updates the Hello field on a list
// of accounts.
	public static void addHelloWorld(Account[] accs){
		for (Account a:accs) {
			if (a.Hello__c != 'World')
				a.Hello__c = 'World';
		}
	}

    @future
    private static void sayHello() {
        System.debug('Hello World');
    }

    @IsTest
    private static testmethod sayHello2() {
        Account a = [SELECT Id FROM Account];
    }
}
