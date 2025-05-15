package com.grupo1.backend.entities;

import java.util.List;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "favoritos", uniqueConstraints = @UniqueConstraint(columnNames = {"user"}))
public class Favoritos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //un carrito para un usuario
    @OneToOne
    @JoinColumn(name = "id_user")
    @JsonIgnore
    private User user;

    //varios productos en varias listas de favoritos
    @ManyToMany
    @JoinTable(
        name = "favoritos_producto",
        joinColumns = @JoinColumn(name = "id_favoritos"),
        inverseJoinColumns = @JoinColumn(name = "id_producto")
    )
    private List<Producto> productos;
}
