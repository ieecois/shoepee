package com.ToDoiVar.ShoesPee.Services;

import com.ToDoiVar.ShoesPee.Exeption.userNotFoundException;
import com.ToDoiVar.ShoesPee.Models.ChangePasswordRequest;
import com.ToDoiVar.ShoesPee.Models.Role;
import com.ToDoiVar.ShoesPee.Models.User;
import com.ToDoiVar.ShoesPee.repositiory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;

@Service
public class UserServiceImpl implements UserService{


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
//
//    @Override
//    public List<User> getAllUser() {
//        return null;
//    }
//
//    @Override
//    public User getUserById(int id) {
//        return null;
//    }
//
//    @Override
//    public void removeUser(int id) {
//
//    }
//
//    @Override
//    public User editUser(int id, User newUser) {
//        return null;
//    }
//
//    @Override
//    public User fineUserByName(String name) {
//        return null;
//    }
//
//    @Override
//    public String addUser(UserDto userDto) {
//        return null;
//    }

//    @Override
//    public UserDetailsService userDetailsService() {
//        return new UserDetailsService() {
//            @Override
//            public UserDetails loadUserByUsername(String username)  {
//                return userRepository.findByEmail(username).orElseThrow(() ->new UsernameNotFoundException("User not found"));
//            }
//        };
//    }

//    @Override
//    public LoginMesage loginUser(LoginDto loginDto) {
//        return null;
//    }


    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }



    @Override
    public Optional<User> getUserById(int id) {
       return Optional.of(userRepository.findById(id).get());
    }

    @Override
    public void removeUser(int id) {
        User user = userRepository.findById(id).get();
        if(user != null){
            userRepository.delete(user);
        }
    }
    public User editUser(int id,User newUser){
        Optional<User> updateuser = Optional.of(userRepository.findById(id).map(user -> {
            user.setUsername(newUser.getUsername());
            user.setPassword(newUser.getPassword());
//            user.setRoleId(newUser.getRoleId());
            return userRepository.save(newUser);
        }).orElseGet(() -> {
            newUser.setUserId(id);
            return userRepository.save(newUser);
        }));

        return newUser;
    }
    @Override
    public User getUserByName(String name) {
        return userRepository.findUserByUsername(name).orElseThrow(() -> new userNotFoundException("Sorry, this user cound not found"));
    }
//    @Override
//    public String addUser(UserDto userDto) {
//        if(userExisted(userDto.getUsername())){
//            throw new userExistedException("this user has been existed");
//        }else {
//            User user = new User(
//                    userDto.getUserId(),
//                    userDto.getUsername(),
//                    this.passwordEncoder.encode(userDto.getPassword()),
//                    userDto.getEmail(),
//                    Role.USER
//            );
//            userRepository.save(user);
//            return "Register OK: " + user.getEmail();
//        }
//
//    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new userNotFoundException("User not found"));
    }

    @Override
    public User getRoleUser(String name) {

        return null;
    }


    private boolean userExisted(String username) {
        return userRepository.findUserByUsername(username).isPresent();
    }

//    @Override
//    public LoginMesage loginUser(LoginDto loginDto) {
//        String msg = "";
//        User user1 = userRepository.findUserByUsername(loginDto.getUsername());
//        if(user1 != null) {
//            String password = loginDto.getPassword();
//            String encodedPassword = user1.getPassword();
//            Boolean isPwdRight = passwordEncoder.matches(password,encodedPassword);
//            if(isPwdRight) {
//                Optional<User> user = userRepository.findByUsernameAndPassword(loginDto.getUsername(),encodedPassword);
//                if (user.isPresent()) {
//                    return new LoginMesage("Login Success",true);
//                } else {
//                    return new LoginMesage("Login Failed", false);
//                }
//            } else {
//                return new LoginMesage("password Not Match ",false);
//            }
//            } else {
//            return new LoginMesage("Username not exist",false);
//        }
//    }

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        userRepository.save(user);
    }

}
