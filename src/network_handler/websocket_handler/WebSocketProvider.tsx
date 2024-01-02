import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type WebSocketMessageHandler = (message: any) => void;

interface IdentifyGlobalWebSocketContextProps {
    sendMessage: (message: string) => void;
    addMessageHandler: (handler: WebSocketMessageHandler) => void;
    removeMessageHandler: (handler: WebSocketMessageHandler) => void;
}

const IdentifyGlobalWebSocketContext = createContext<IdentifyGlobalWebSocketContextProps | undefined>(undefined);


export const IdentifyGlobalWebSocketProvider: React.FC<{ children: any, socketUrl: string, socketPort: string }> = ({ children, socketUrl }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messageHandlers, setMessageHandlers] = useState<WebSocketMessageHandler[]>([]);
    const ws = new WebSocket(socketUrl);
    const sendMessage = useCallback((message: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        }
    }, [socket]);

    const addMessageHandler = useCallback((handler: WebSocketMessageHandler) => {
        setMessageHandlers((prevHandlers) => [...prevHandlers, handler]);
    }, []);

    const removeMessageHandler = useCallback((handler: WebSocketMessageHandler) => {
        setMessageHandlers((prevHandlers) => prevHandlers.filter(h => h !== handler));
    }, []);

    useEffect(() => {

        ws.readyState
        ws.onopen = () => {
            console.log('WebSocket connection opened');
            // Bağlantı başarılı olduğunda yapılacak işlemler
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            messageHandlers.forEach(handler => handler(data));
            console.log("event", event)
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = (event) => {
            console.log('WebSocket disconnected:', event.reason);
        };

        setSocket(ws);


        return () => {
            ws.close();
        };
    }, [messageHandlers]);

    return (
        <IdentifyGlobalWebSocketContext.Provider value={{ sendMessage, addMessageHandler, removeMessageHandler }}>
            {children}
        </IdentifyGlobalWebSocketContext.Provider>
    );
};

export const useIdentifyGlobalWebSocket = () => {
    const context = useContext(IdentifyGlobalWebSocketContext);
    if (!context) {
        throw new Error('useIdentifyGlobalWebSocket must be used within an IdentifyGlobalWebSocketProvider');
    }
    return context;
};
