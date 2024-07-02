package br.univille.projetopadariafabsoft.service;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import br.univille.projetopadariafabsoft.entities.Funcionario;
import br.univille.projetopadariafabsoft.repository.FuncionarioRepository;

@ExtendWith(MockitoExtension.class)
class FuncionarioServiceTest {

    @Mock
    private FuncionarioRepository funcionarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private FuncionarioService funcionarioService;

    @Test
    void shouldSaveFuncionario() {
        Funcionario funcionario = new Funcionario();
        funcionario.setUsuario("usuario");
        funcionario.setSenha("senha");

        when(passwordEncoder.encode(any())).thenReturn("encodedSenha");
        when(funcionarioRepository.save(any(Funcionario.class))).thenReturn(funcionario);

        Funcionario savedFuncionario = funcionarioService.save(funcionario);

        assertNotNull(savedFuncionario);
        assertEquals("usuario", savedFuncionario.getUsuario());
        assertEquals("encodedSenha", savedFuncionario.getSenha());

        verify(passwordEncoder, times(1)).encode("senha");
        verify(funcionarioRepository, times(1)).save(funcionario);
    }

    @Test
    void shouldFindFuncionarioById() {
        Funcionario funcionario = new Funcionario();
        funcionario.setId(1L);
        funcionario.setUsuario("usuario");

        when(funcionarioRepository.findById(1L)).thenReturn(Optional.of(funcionario));

        Optional<Funcionario> foundFuncionario = funcionarioService.findById(1L);

        assertTrue(foundFuncionario.isPresent());
        assertEquals("usuario", foundFuncionario.get().getUsuario());

        verify(funcionarioRepository, times(1)).findById(1L);
    }
}