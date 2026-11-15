// Mock MetaMask Provider for Testing
// This simulates MetaMask behavior without needing the actual extension

interface MockEthereumProvider {
  isMetaMask: boolean;
  isMockMetaMask?: boolean;
  selectedAddress: string | null;
  chainId: string;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (eventName: string, handler: (...args: any[]) => void) => void;
  removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
}

class MockMetaMaskProvider implements MockEthereumProvider {
  isMetaMask = true;
  isMockMetaMask = true; // Mark this as a mock provider
  selectedAddress: string | null = null;
  chainId: string = '0x13881'; // Polygon Mumbai
  private listeners: Map<string, Set<Function>> = new Map();
  private accounts: string[] = [];
  private mockChainId: string = '0x13881'; // Polygon Mumbai (80001 in decimal)

  on(eventName: string, handler: (...args: any[]) => void): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(handler);
  }

  removeListener(eventName: string, handler: (...args: any[]) => void): void {
    this.listeners.get(eventName)?.delete(handler);
  }

  private emit(eventName: string, ...args: any[]): void {
    this.listeners.get(eventName)?.forEach((handler) => handler(...args));
  }

  async request(args: { method: string; params?: any[] }): Promise<any> {
    const { method, params } = args;

    console.log(`[Mock MetaMask] ${method}`, params);

    switch (method) {
      // Request accounts - user approves connection
      case 'eth_requestAccounts': {
        // Simulate wallet with test address
        const testAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
        this.selectedAddress = testAddress;
        this.accounts = [testAddress];
        
        // Emit accountsChanged event
        this.emit('accountsChanged', this.accounts);
        
        console.log(`[Mock MetaMask] ✅ Connected: ${testAddress}`);
        return this.accounts;
      }

      // Get accounts
      case 'eth_accounts':
        return this.accounts;

      // Get chain ID
      case 'eth_chainId':
        return this.mockChainId;

      // Get balance
      case 'eth_getBalance': {
        const address = params?.[0];
        // Return mock balance (10 MATIC in wei)
        return '0x8AC7230489E80000'; // 10 * 10^18
      }

      // Switch chain
      case 'wallet_switchEthereumChain': {
        const chainId = params?.[0]?.chainId;
        if (chainId === '0x13881') {
          this.mockChainId = chainId;
          this.emit('chainChanged', chainId);
          console.log(`[Mock MetaMask] ✅ Switched to Polygon Mumbai`);
          return null;
        }
        throw new Error(`Chain ${chainId} not supported in mock`);
      }

      // Add chain
      case 'wallet_addEthereumChain': {
        const chainId = params?.[0]?.chainId;
        if (chainId === '0x13881') {
          this.mockChainId = chainId;
          this.emit('chainChanged', chainId);
          console.log(`[Mock MetaMask] ✅ Added Polygon Mumbai network`);
          return null;
        }
        throw new Error('Network addition failed');
      }

      // Sign message
      case 'personal_sign': {
        const message = params?.[0];
        const address = params?.[1];
        // Return mock signature
        const mockSignature = '0x' + 'a'.repeat(130); // 65 bytes = 130 hex chars
        console.log(`[Mock MetaMask] ✅ Signed message with ${address}`);
        return mockSignature;
      }

      // Send transaction (mock)
      case 'eth_sendTransaction': {
        const tx = params?.[0];
        // Return mock transaction hash
        const mockTxHash = '0x' + 
          Array.from({length: 64}, () => 
            Math.floor(Math.random() * 16).toString(16)
          ).join('');
        console.log(`[Mock MetaMask] ✅ Transaction sent: ${mockTxHash}`);
        console.log(`[Mock MetaMask] From: ${tx?.from}`);
        console.log(`[Mock MetaMask] To: ${tx?.to}`);
        console.log(`[Mock MetaMask] Value: ${tx?.value || '0x0'}`);
        return mockTxHash;
      }

      // Call contract (read)
      case 'eth_call': {
        // Return mock data
        console.log(`[Mock MetaMask] ✅ Contract call executed`);
        return '0x';
      }

      // Get network version
      case 'net_version':
        return '80001'; // Polygon Mumbai

      // Web3 version
      case 'web3_clientVersion':
        return 'MockMetaMask/1.0.0';

      default:
        console.log(`[Mock MetaMask] Method not implemented: ${method}`);
        throw new Error(`Method ${method} not implemented in mock provider`);
    }
  }
}

// Create mock provider instance
export const createMockMetaMaskProvider = (): MockEthereumProvider => {
  return new MockMetaMaskProvider();
};

// Auto-inject into window if needed
export const injectMockMetaMask = (): void => {
  if (typeof window !== 'undefined') {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      console.log('🔧 Injecting Mock MetaMask Provider...');
      (window as any).ethereum = createMockMetaMaskProvider();
      console.log('✅ Mock MetaMask injected successfully!');
      console.log('📱 Features: Mock wallet, transaction signing, network switching');
    } else {
      console.log('✅ Real MetaMask provider already available');
    }
  }
};
