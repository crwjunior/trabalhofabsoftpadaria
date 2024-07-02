package br.univille.projetopadariafabsoft.controllers;


import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import br.univille.projetopadariafabsoft.entities.Fornecedor;
import br.univille.projetopadariafabsoft.service.FornecedorService;

@ExtendWith(MockitoExtension.class)
class FornecedorControllerTest {

    @Mock
    private FornecedorService fornecedorService;

    @InjectMocks
    private FornecedorController fornecedorController;

    private MockMvc mockMvc;

    @Test
    void shouldReturnFornecedorById() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(fornecedorController).build();

        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setId(1L);
        fornecedor.setNome("Fornecedor 1");

        when(fornecedorService.findById(1L)).thenReturn(Optional.of(fornecedor));

        mockMvc.perform(get("/api/fornecedores/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(fornecedorService, times(1)).findById(1L);
    }
}