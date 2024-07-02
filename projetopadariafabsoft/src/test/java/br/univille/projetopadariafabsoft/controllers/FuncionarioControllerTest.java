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

import br.univille.projetopadariafabsoft.entities.Funcionario;
import br.univille.projetopadariafabsoft.service.FuncionarioService;

@ExtendWith(MockitoExtension.class)
class FuncionarioControllerTest {

    @Mock
    private FuncionarioService funcionarioService;

    @InjectMocks
    private FuncionarioController funcionarioController;

    private MockMvc mockMvc;

    @Test
    void shouldReturnFuncionarioById() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(funcionarioController).build();

        Funcionario funcionario = new Funcionario();
        funcionario.setId(1L);
        funcionario.setUsuario("usuario");

        when(funcionarioService.findById(1L)).thenReturn(Optional.of(funcionario));

        mockMvc.perform(get("/api/funcionarios/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(funcionarioService, times(1)).findById(1L);
    }
}