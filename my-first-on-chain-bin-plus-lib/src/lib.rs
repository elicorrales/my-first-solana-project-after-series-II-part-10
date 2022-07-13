use solana_program::{
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    account_info::AccountInfo,
    stake_history::Epoch,
    msg
};

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey,       
    accounts: &[AccountInfo],  
    instruction_data: &[u8],  
  ) -> ProgramResult {

    msg!("This is the entry point.");

    Ok(())
}
