package com.grupo1.backend.entities;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.grupo1.backend.entities.enums.CategoriaProducto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "marca")
    private String marca;

    @Column(name = "precio")
    private BigDecimal precio;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "categoria")
    @Enumerated(EnumType.STRING)
    private CategoriaProducto categoria;

    @Column(name = "imagen")
    private String imagen;

    //varios productos en varios carritos
    @ManyToMany(mappedBy = "productos")
    @JsonIgnore
    private List<Carrito> carritos; 

    //varios productos en varios pedidos
    @ManyToMany(mappedBy = "productos")
    @JsonIgnore
    private List<Pedido> pedidos;

    //un producto en varias reseñas
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Comentario> comentarios;
    
}
