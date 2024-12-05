module coin_transfer {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    /// Error codes
    const EINSUFFICIENT_BALANCE: u64 = 1;
    const EINVALID_AMOUNT: u64 = 2;

    /// Stores the user's balance information
    struct UserBalance has key {
        balance: u64
    }

    /// Initialize a new user's balance
    public entry fun initialize_balance(account: &signer) {
        if (!exists<UserBalance>(signer::address_of(account))) {
            move_to(account, UserBalance { balance: 0 });
        }
    }

    /// Transfer coins from sender to recipient
    public entry fun transfer_coins(
        from: &signer,
        to: address,
        amount: u64
    ) acquires UserBalance {
        // Ensure sender has sufficient balance
        let sender_addr = signer::address_of(from);
        assert!(exists<UserBalance>(sender_addr), 0);
        
        let sender_balance = borrow_global_mut<UserBalance>(sender_addr);
        assert!(sender_balance.balance >= amount, EINSUFFICIENT_BALANCE);
        assert!(amount > 0, EINVALID_AMOUNT);

        // Initialize recipient's balance if it doesn't exist
        if (!exists<UserBalance>(to)) {
            move_to(from, UserBalance { balance: 0 });
        }

        // Update balances
        let recipient_balance = borrow_global_mut<UserBalance>(to);
        sender_balance.balance = sender_balance.balance - amount;
        recipient_balance.balance = recipient_balance.balance + amount;

        // Transfer APT coins
        coin::transfer<AptosCoin>(from, to, amount);
    }

    /// Withdraw coins from user's balance
    public entry fun withdraw_coins(
        account: &signer,
        amount: u64
    ) acquires UserBalance {
        let addr = signer::address_of(account);
        assert!(exists<UserBalance>(addr), 0);
        
        let balance = borrow_global_mut<UserBalance>(addr);
        assert!(balance.balance >= amount, EINSUFFICIENT_BALANCE);
        assert!(amount > 0, EINVALID_AMOUNT);

        balance.balance = balance.balance - amount;
    }

    /// Get the balance of a user
    #[view]
    public fun get_balance(addr: address): u64 acquires UserBalance {
        if (!exists<UserBalance>(addr)) {
            return 0
        };
        borrow_global<UserBalance>(addr).balance
    }
}