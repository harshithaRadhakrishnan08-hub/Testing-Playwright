Feature: API Automation

@herokuapp
Scenario: Herokuapp API 
When I sent GET request 
Then Receive statuscode for GET request
When Create an Auth Token for POST and DELETE
"""
{
    "username" : "admin",
    "password" : "password123"
}
""" 
Then I sent POST request for creating new booking 
"""
{
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}
"""
Then Recieve statuscode for POST request
Then I sent PUT request for Updating the Booking
"""
{
    "firstname" : "James",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}
"""
Then Receive statuscode for PUT request 
Then I sent PATCH request for partial update
"""
{
    "firstname" : "Harshitha",
    "lastname" : "Radhakrishnan"
}
"""
Then Receive statuscode for PATCH request 
Then I sent DELETE request using token
Then Receive statuscode for DELETE request