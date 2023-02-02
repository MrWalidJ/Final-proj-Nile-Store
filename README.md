Introduction
Nile Store is an e-commerce website that was developed to buy and sell two product categories , laptops and smartphones. It has a variety of smartphones and laptops all displayed in the homepage from which the user can choose and add to his cart and complete the purchase or add items to his favorites list so that he can purchase later .
(Note: This website can be expanded to include much more categories, but here I focused in these two categories). 

Programming languages and Frameworks:   
This website was designed by using HTML 5 , CSS , Bootstrap 5 , and React Js in front-end , and Node js Express , MongoDB in backend section.
Contents and Functionality:
•	Adding Items to Cart:
When a user navigates to the homepage , he can add any collection of items into the cart by clicking Add to Cart button underneath each item. Then he can view his cart items by clicking the cart dropdown located in the navbar and then click Go to Cart . Cart page includes a list of all chosen items , an option to select the quantity of each item , an option to delete any item , and a side bar which will automatically calculates the subtotal number and the total price.  User cannot proceed to check out unless he is signed in .  

•	Sign in and Registration :
A user can sign in by clicking on (Sign In) in the navbar. If he's a new user , he can sign up by clicking Create new account under the submit button in sign in page.. In the sign up page he will be asked to enter his name , email address , password (he must follow the instructions that appears bellow), and cofirm his password. Then he has an option to choose the account type , seller or admin or just to be a customer.
If a user forgets his password, he must click on (Forgot Password?))  in the sign in screen . when doing so he will be first asked to enter his email address. An authentication email will then be sent to his email with a link . Once sent he must click on the link and change his password.

•	Proceeding to checkout and placing the order :
Once the user has successfully signed in and added items to his cart, he can click on proceed to checkout button to proceed, he will be navigated to shipping address page where he will be asked to provide his address details. Next he will be navigated to view order page  , which will display all the necessary info including user name , shipping address , a list of the selected items , and an info showing the items price , shipping price , tax m and total price. If he clicks on place order , all the info will be saved in the database and he will be navigated to place order page showing all the order info with the order ID .

•	User Accounts :
In this project there are 3 main user account types , customer account , seller account , and admin .
-	Customer account: Any user who is not registered as a seller or an admin is considered a customer. Here the user can show all the products , add items to his favorites, add to cart , proceed to checkout and place his order. Besides he can display his order history in a table.
-	Seller account: Any user registered as a seller can do everything the customer can do , but he has the ability to add a new product , he can also display his own products , update their info and delete any of them .
-	Admin : An Admin can add products , display his own products , update and delete any product for any user.
Note: Authorizations of users were given by means of jsonwebtoken (jwt) .

•	Filtering : 
Any user can filter products according to their price (ascending or descending order) , he also can filter them by category. Besides he can filter by product name by typing the bame in the search area in the navbar.

•	Contact page :
By clicking on "Contact us" in the footer at the bottom of the screen , user will be redirected to contact page, where he can view the map location and send a message .
