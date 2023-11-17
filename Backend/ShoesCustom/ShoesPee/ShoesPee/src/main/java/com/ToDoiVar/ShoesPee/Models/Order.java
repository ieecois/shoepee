package com.ToDoiVar.ShoesPee.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;
    private String orderStatus;
    private String paymentStatus;
    private boolean status;
    private double orderAmt;
    private String billingAddress;
    private String phoneNumber;
    private String fullName;
    private Date orderCreateAt;
    @ManyToOne
    private User user;
    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL)



    private Set<OrderItem> orderItem=new HashSet<>();

    //Cons






//    public Order() {
//        super();
//        // TODO Auto-generated constructor stub
//    }

//    public Order(int orderId, String orderStatus, String paymentStatus, Date orderDelivered, double orderAmt,
//                 String billingAddress, Date orderCreateAt, User user, Set<OrderItem> orderItem) {
//        super();
//        this.orderId = orderId;
//        this.orderStatus = orderStatus;
//        this.paymentStatus = paymentStatus;
//        this.status = orderDelivered;
//        this.orderAmt = orderAmt;
//        this.billingAddress = billingAddress;
//        this.orderCreateAt = orderCreateAt;
//        this.user = user;
//        this.orderItem = orderItem;
//    }
//
//    public Date getOrderCreateAt() {
//        return orderCreateAt;
//    }
//
//    public void setOrderCreateAt(Date orderCreateAt) {
//        this.orderCreateAt = orderCreateAt;
//    }
//
//    //Getter && Setter
//    public int getOrderId() {
//        return orderId;
//    }
//
//    public void setOrderId(int orderId) {
//        this.orderId = orderId;
//    }
//    public String getOrderStatus() {
//        return orderStatus;
//    }
//    public void setOrderStatus(String orderStatus) {
//        this.orderStatus = orderStatus;
//    }
//    public String getPaymentStatus() {
//        return paymentStatus;
//    }
//    public void setPaymentStatus(String paymentStatus) {
//        this.paymentStatus = paymentStatus;
//    }
//    public Date getOrderDelivered() {
//        return orderDelivered;
//    }
//    public void setOrderDelivered(Date orderDelivered) {
//        this.orderDelivered = orderDelivered;
//    }
//    public double getOrderAmt() {
//        return orderAmt;
//    }
//    public void setOrderAmt(double orderAmt) {
//        this.orderAmt = orderAmt;
//    }
//    public String getBillingAddress() {
//        return billingAddress;
//    }
//    public void setBillingAddress(String billingAddress) {
//        this.billingAddress = billingAddress;
//    }
//    public User getUser() {
//        return user;
//    }
//    public void setUser(User user) {
//        this.user = user;
//    }
//    public Set<OrderItem> getOrderItem() {
//        return orderItem;
//    }
//    public void setOrderItem(Set<OrderItem> orderItem) {
//        this.orderItem = orderItem;
//    }
}
