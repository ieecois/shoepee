package com.ToDoiVar.ShoesPee.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tblinforuser")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InforUser {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;
    @Column(name = "fullname")
    private String fullname;
    @Column(name = "address")
    private String address;
    @Column(name = "phone")
    private String phone;
    @OneToOne
    @JoinColumn(name = "user_userid")
    @JsonBackReference
    private User user;
}
