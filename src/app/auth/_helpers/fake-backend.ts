import { BaseRequestOptions, Http, RequestMethod, RequestOptions, Response, ResponseOptions, XHRBackend } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";
import * as myGlobals from "../../Global";
import swal from "sweetalert2";
export function mockBackEndFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    let email: string; // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    // fake token
    let token: string = 'fake-jwt-token';
    let currentData = localStorage.getItem('currentUser');
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {
            // pass through any requests not handled above

            // authenticate
            if (connection.request.url.endsWith('http://localhost:57509/api/Login/getLogin') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                let realHttp = new Http(realBackend, options);
                let requestOptions = new RequestOptions({
                    method: connection.request.method,
                    headers: connection.request.headers,
                    body: JSON.parse(connection.request.getBody()),
                    url: connection.request.url,
                    withCredentials: connection.request.withCredentials,
                    responseType: connection.request.responseType
                });

                /////////////////////////////////////////EMP  EMAIL ID ////////////////////
                //   realHttp.request('http://localhost:57509/api/Login/getStaffLoginDet', requestOptions)
                //     .subscribe((response: Response) => {
                //        let user = response.json().data;
                //       // localStorage.setItem('LoginData', JSON.stringify(user));
                //                     this.email=user[0].email_Id;
                //                     //this.email_Id=user[0].comp_Id;
                //                     myGlobals.setEmailValue(this.email);



                //     });


                ////////////////////////////////////////////////////////////////////////

                realHttp.request('http://localhost:57509/api/Login/getLogin', requestOptions)
                    .subscribe((response: Response) => {
                        let user = response.json().data;
                        let user1 = response.json().data;
                        localStorage.setItem('LoginData', JSON.stringify(user));
                        var length = user1.length
                        if (length == 0) {
                            swal("Please Enter Valid UserName or Password");
                        }
                        else if (user[0].message == "Login Successful!!") {

                        }
                        else {
                            swal("Please Enter Valid UserName or Password");
                        }
                        if (user[0].login_Id != 0) {
                            // if login details are valid return 200 OK with user details and fake jwt token
                            let currentUser = JSON.parse(localStorage.getItem('LoginData'));
                            connection.mockRespond(new Response(new ResponseOptions({
                                status: 200,
                                body: {
                                    login_Id: user[0].login_Id,
                                    comp_Id: user[0].comp_Id,
                                    staff_Id: user[0].staff_Id,
                                    email_Id: user[0].email_Id,
                                    role_Id: user[0].role_Id,
                                    branch_Id: user[0].branch_Id,
                                    reporting_Manager: user[0].reporting_Manager,
                                    user_Type: user[0].user_Type,
                                    user_Name: user[0].staff_Name,
                                    token: user[0].token,
                                }
                            })));
                        } else {
                            // else return 400 bad request
                            connection.mockError(new Error('username or password is incorrect'));
                        }
                        return;
                        //connection.mockRespond(response);
                    },
                    (error: any) => {
                        connection.mockError(error);
                    }); let currentUser = JSON.parse(localStorage.getItem('LoginData'));
                // find if any user matches login credentials
                // let filteredUsers = users.filter(user => {
                //     return user.user_Name === params.user_Name && user.password === params.password;
                // });

                // // default account
                // if (params.user_Name === 'demo@demo.com' && params.password === 'demo') {
                //     filteredUsers[0] = {
                //         fullName: 'Demo',
                //         user_Name: 'demo@demo.com',
                //         password: 'demo',
                //     };
                // }


            }
            let currentUser = JSON.parse(localStorage.getItem('LoginData'));
            // get users
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security
                // is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer ' + JSON.parse(localStorage.getItem('LoginData')).token) {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }


            // get user by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer ' + JSON.parse(localStorage.getItem('LoginData')).token) {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => {
                        return user.id === id;
                    });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // create user
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newUser = JSON.parse(connection.request.getBody());

                // validation
                let duplicateUser = users.filter(user => {
                    return user.user_Name === newUser.user_Name;
                }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('user_Name "' + newUser.user_Name + '" is already registered'));
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // delete user
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer ' + JSON.parse(localStorage.getItem('LoginData')).token) {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // token verify
            if (connection.request.url.endsWith('/api/verify') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security
                // is implemented server side in a real application
                let tokenData = JSON.parse(localStorage.getItem('LoginData'));
                if (JSON.parse(localStorage.getItem('LoginData'))) {
                    if (connection.request.headers.get('Authorization') === 'Bearer ' + tokenData[0].token) {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: { status: 'ok' } })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }
                else {
                    if (connection.request.headers.get('Authorization') === 'Bearer ' + '') {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: { status: 'ok' } })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }

                return;
            }

            // forgot password
            if (connection.request.url.endsWith('/api/forgot-password') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.user_Name === params.user_Name;
                });

                if (filteredUsers.length) {
                    // in real world, if user_Name is valid, send user_Name change password link
                    let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('User with this user_Name does not exist'));
                }

                return;
            }

            // pass through any requests not handled above
            // let realHttp = new Http(realBackend, options);
            // let requestOptions = new RequestOptions({
            //     method: connection.request.method,
            //     headers: connection.request.headers,
            //     body: connection.request.getBody(),
            //     url: connection.request.url,
            //     withCredentials: connection.request.withCredentials,
            //     responseType: connection.request.responseType
            // });
            // realHttp.request(connection.request.url, requestOptions)
            //     .subscribe((response: Response) => {
            //         connection.mockRespond(response);
            //     },
            //     (error: any) => {
            //         connection.mockError(error);
            //     });

        }, 500);

    });

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    deps: [MockBackend, BaseRequestOptions, XHRBackend],
    useFactory: mockBackEndFactory
};