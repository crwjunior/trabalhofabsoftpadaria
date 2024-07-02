package br.univille.projetopadariafabsoft.controllers;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.univille.projetopadariafabsoft.entities.Produto;
import br.univille.projetopadariafabsoft.service.ProdutoService;

@ExtendWith(MockitoExtension.class)
class ProdutoControllerTest {

    @Mock
    private ProdutoService produtoService;

    @InjectMocks
    private ProdutoController produtoController;

    private MockMvc mockMvc;

    @Test
    void shouldReturnProdutoById() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(produtoController).build();

        Produto produto = new Produto();
        produto.setId(1L);
        produto.setNome("Pão");

        when(produtoService.findById(1L)).thenReturn(Optional.of(produto));

        mockMvc.perform(get("/api/produtos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(produtoService, times(1)).findById(1L);
    }
}