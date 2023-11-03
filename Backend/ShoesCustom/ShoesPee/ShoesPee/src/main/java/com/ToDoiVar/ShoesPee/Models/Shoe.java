package com.ToDoiVar.ShoesPee.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Entity
@Table(name = "tblshoe")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Shoe {
    @Id
    @Column(name = "shoeid")
    private int id;
//    @Column(name = "modelid")
//    private int modelId;
    @Column(name = "price")
    private double price;
    @Column(name = "description")
    private String description;
    @Column(name = "imageurl")
    private String imageUrl;

    @ManyToOne()
    @JoinColumn(name = "shoe_model_modelid")
    @JsonIgnore
    private ShoeModel shoeModel;



    @OneToMany(mappedBy = "shoe",cascade = CascadeType.ALL)
    private Set<ImageShoe> imageShoes = new HashSet<>();

    public Set<ImageShoe> getImageShoes() {
        return imageShoes;
    }

    public void setImageShoes(Set<ImageShoe> imageShoes) {
        this.imageShoes = imageShoes;
    }
}