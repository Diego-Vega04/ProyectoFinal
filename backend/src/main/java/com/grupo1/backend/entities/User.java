package com.grupo1.backend.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grupo1.backend.entities.enums.Rol;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = {"email", "carrito"}))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellidos")
    private String apellidos;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "cp")
    private int cp;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "rol")
    @Enumerated(EnumType.STRING)
    private Rol rol;

    @OneToOne(mappedBy = "user")
    private Carrito carrito;

    @OneToMany(mappedBy = "user")
    private List<Pedido> pedidos;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Comentario> comentarios;

}
