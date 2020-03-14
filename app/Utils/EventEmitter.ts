type Listener = (event: string, callback: Function) => void;

class EventEmitter {
  listeners: Record<string, Function[]> = {};

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(fn => {
        fn(data);
      });
    }
  }

  on(event: string, listener: (data: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  off(event: string, listener: (data: any) => void) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        fn => fn !== listener
      );
    }
  }
}

export { EventEmitter };
