package com.chatigo.controllers;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
            config.enableSimpleBroker("/chat");
            config.setApplicationDestinationPrefixes("/app");
            config.setUserDestinationPrefix("/chat");
        }
    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setTimeToFirstMessage(99999); // Time
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
//            registry.addEndpoint("/messenger");
            registry.addEndpoint("/messenger").withSockJS();
        }

}
